from django.http import JsonResponse
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import pymongo
from pymongo import MongoClient
import os
import threading


cluster = MongoClient(f"mongodb+srv://jjbe93:{os.environ.get('MONGODB_PW')}@cluster0-movcq.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["leaders_test"]
collection = db["worldometers_covid19_table"]


def webdriver_get_from_web():
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.implicitly_wait(10)
    driver.get('https://www.worldometers.info/coronavirus/')

    # getting table out
    table = driver.find_element_by_xpath('//*[@id="main_table_countries_today"]/tbody[1]')
    data = []
    countries = []
    filter_countries = driver.find_elements_by_class_name("mt_a")
    for c in filter_countries:
        if c.text != "":
            countries.append(c.text)

    for country in countries:
        if country != "":
            # getting country row out
            xpath = f"//td[contains(., '{country}')]"
            country_element = table.find_element_by_xpath(xpath)
            row = country_element.find_element_by_xpath("./..")

            # extracting data from each row_cell
            col_data = row.find_elements_by_tag_name("td")
            data_val = [x.text for x in col_data]
            data.append(data_val)
            print(data_val)
    driver.close()
    # Inserting all the scraped data from web to our DB
    for i in range(len(data)):
        key = {"Country": data[i][0]}
        value = {
            "Country": data[i][0],
            "Total_Cases": data[i][1],
            "New_Cases": data[i][2],
            "Total_Deaths": data[i][3],
            "New_Deaths": data[i][4],
            "Total_Recovered": data[i][5],
            "Active_Cases": data[i][6],
            "Critical_Cases": data[i][7],
            "Total_Tests": data[i][10]
        }
        collection.update_one(key, {"$set": value}, upsert=True)


def getInfo(request):
    t1 = threading.Thread(target=webdriver_get_from_web)
    t1.start()
    # data = webdriver_get_from_web()
    data = list(collection.find({}, {'_id': 0}))
    return JsonResponse({"data": data})
