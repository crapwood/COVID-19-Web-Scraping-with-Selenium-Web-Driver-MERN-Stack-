from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


# Create your views here.
def webdriver_get_from_web():
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.implicitly_wait(10)
    driver.get('https://www.worldometers.info/coronavirus/')

    # getting table out
    table = driver.find_element_by_xpath('//*[@id="main_table_countries_today"]/tbody[1]')
    data = []
    countries = []
    filter_countries = driver.find_elements_by_class_name("mt_a")
    num_countries = 1
    for c in filter_countries:
        if c.text != "" and num_countries < 51:
            countries.append(c.text)
        num_countries += 1

    num_countries_to_send = 1
    for country in countries:
        if num_countries_to_send < 51:
            # getting country row out
            xpath = f"//td[contains(., '{country}')]"
            country_element = table.find_element_by_xpath(xpath)
            row = country_element.find_element_by_xpath("./..")

            # extracting data from each row_cell
            col_data = row.find_elements_by_tag_name("td")
            data_val = [x.text for x in col_data]
            data.append(data_val)
            print(data_val)
            num_countries_to_send += 1
    return data


def getInfo(request):
    data = webdriver_get_from_web()
    return JsonResponse({"data": data})
