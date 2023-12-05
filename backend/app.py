import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template, redirect, url_for, json
import pickle
import os
from flask_cors import CORS, cross_origin
from json import *

app = Flask(__name__)
CORS(app, supports_credentials=True)
model1 = pickle.load(open('individual_RF_model.pickle', 'rb'))
model2 = pickle.load(open('industry_RF_model.pickle', 'rb'))


individual_ebill_rec_model = pickle.load(open('individual_ebill_recommend.pickle', 'rb'))
individual_car_milage_rec_model = pickle.load(open('individual_car_milage_rec.pickle', 'rb'))
individual_recycle_newspaper_rec_model = pickle.load(open('individual_recycle_newspaper_rec.pickle', 'rb'))
individual_recycle_tin_rec_model = pickle.load(open('individual_recycle_tin_rec.pickle', 'rb'))

industry_siteeui_rec_model = pickle.load(open('industry_SiteEUI_rec.pickle', 'rb'))
industry_sourceeui_rec_model = pickle.load(open('industry_SourceEUI_rec.pickle', 'rb'))


site_eui_recommend = ["Your Site EUI is below the average rate which is contributing minimal amounts of carbon emission. Try maintaining this level and help reduce Carbon Emission! ",
                  "Your Site EUI is below the average rate which is contributing minimal amounts of carbon emission. Try maintaining this level and help reduce Carbon Emission! ",
                  "Your Site EUI is contributing towards high amount of carbon emission. Try to maintain your Site EUI levels by making changes like: Upgrading HVAC (Heating, Ventilation, Air Conditioning) systems, installing energy-efficient windows etc. You can gather more information by visiting: https://help.covetool.com/en/articles/4533792-6-ways-to-lower-your-eui"]

source_eui_recommend = ["Your Source EUI is below the average rate which is contributing minimal amounts of carbon emission. Try maintaining this level and help reduce Carbon Emission! ",
                  "Your Source EUI is contributing towards an average amount of carbon emission. Try to maintain your Source EUI levels by making slight changes like: Using renewable energy when possible, installing energy efficient lightings etc.You can gather more information by visiting: https://www.fmlink.com/articles/reducing-energy-use-intensity-to-achieve-net-zero-the-role-of-facilities-management/",
                  "Your Source EUI is contributing towards high amount of carbon emission. Try to maintain your Source EUI levels by making changes like: implementing builiding automation system, improving building envelope etc.You can gather more information by visiting: https://www.fmlink.com/articles/reducing-energy-use-intensity-to-achieve-net-zero-the-role-of-facilities-management/"]

ebill_recommend = ["Your electricity consumption is below the average rate which is contributing minimal amounts of carbon emission. Try maintaining this level and help reduce Carbon Emission!",
                  "Your electricity consumption is contributing towards an average amount of carbon emission. Try to maintain your energy usage by making slight changes in your lifestyle like: Taking shorter showers, Washing dishes by hand etc. You can gather more information by visiting: https://www.energysage.com/energy-efficiency/101/ways-to-save-energy/",
                  "Your electricity consumption is contributing towards high amount of carbon emission. Try to maintain your energy usage by making changes in your lifestyle like: Switching to LED Bulbs, Unplugging Electronics when not in use etc. You can gather more information by visiting: https://www.energysage.com/energy-efficiency/101/ways-to-save-energy/"]

car_milage_recommend = ["Your fuel consumption is below the average rate which is contributing minimal amounts of carbon emission. Try maintaining this level and help reduce Carbon Emission!",
                        "Your fuel consumption is contributing towards an average amount of carbon emission. Try to maintain your fuel consumption by making slight changes in your lifestyle like: Using public transportation or carpool when possible, reducing unnecessary driving etc.You can gather more information by visiting: https://www.mobil.com/en/sap/personal-vehicles/car/vehicle-maintenance/reduce-fuel-consumption",
                       "Your fuel consumption is contributing towards high amount of carbon emission. Try to maintain your fuel consumption by making changes in your lifestyle like: Switching to EV, keeping your vehicle maintained.You can gather more information by visiting: https://www.mobil.com/en/sap/personal-vehicles/car/vehicle-maintenance/reduce-fuel-consumption"]

recycle_newspaper_recommend = ["Great Job! You are helping reduce greenhouse gas emissions. Also, did you know that the amount of energy and materials it takes to make a ton of office paper is reduced by 4.3 tons of CO2 when recycling paper. Keep on recycling newspapers and help reduce Carbon Emission!",
                              "Recycling newspapers help reduce carbon emissions. Recycling one ton of newspaper can save approximately 3.3 cubic yards of landfill space, 17 trees, 7,000 gallons of water, and 4,100 kilowatt-hours of electricity. So, please start recycling Newspapers!"]

recycle_tin_recommend = ["Great Job! Recycling aluminum and tin can significantly reduce carbon emissions and is an important step towards a more sustainable and environmentally friendly future. Keep on recycling aluminum & tin and help reduce Carbon Emission!",
                        "Recycling aluminum can save up to 95% of the energy required to produce aluminum from raw materials and recycling tin can save up to 60% of the energy required to produce tin from raw materials. So, please start Recycling Aluminum and Tin!"]



fin = []


@app.route('/query1', methods=['POST'])
@cross_origin(supports_credentials=True)
def model_pred_1():
    #INDIVIDUAL
    description = request.args.get('description')

    # [eBill, gill, ]

    keys_d = ['Electricity Bill(Monthly in Rs.)', 'Gas Bill (Monthly in Rs.)',
              'Oil Bill (Monthly in Rs)', 'Car Mileage (Yearly in Rs.)',
              'No. of flights in Past year(4hr or less)',
              'No. of flights in past year (4hrs or more)',
              'Recycled Newspaper past year', 'Recycled Aluminium and Tin Past year']

    inputData = [float(i) for i in description.split(',')]
    print(f"Yaha Input aa rha h ------->  {inputData}")

    df = pd.DataFrame(dict(zip(keys_d, inputData)), index=[0])

    y_pred = model1.predict(df)[0]
    
    #running model for recommendations:
    rec1 = individual_ebill_rec_model.predict([[inputData[0]]])
    rec2 = individual_car_milage_rec_model.predict([[inputData[3]]])
    rec3 = individual_recycle_newspaper_rec_model.predict([[inputData[-2]]])
    rec4 = individual_recycle_tin_rec_model.predict([[inputData[-1]]])

    print(f"idhar answer h -> {type(inputData)}")
    # prediction.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify([round(y_pred, 3), ebill_recommend[rec1[0]], car_milage_recommend[rec2[0]], recycle_newspaper_recommend[rec3[0]], recycle_tin_recommend[rec4[0]]])


@app.route('/query2', methods=['POST'])
@cross_origin(supports_credentials=True)
def model_pred_2():
    #INDUSTRY
    description = request.args.get('description')
    # [eBill, gill, ]

    keys_d = ['NumberofFloors', 'PropertyGFAParking', 'PropertyGFABuilding(s)',
              'SiteEUI(kBtu/sf)', 'SourceEUI(kBtu/sf)',
              'SteamUse(kBtu)', 'Electricity(kBtu)', 'NaturalGas(kBtu)']

    inputData = [float(i) for i in description.split(',')]

    df = pd.DataFrame(dict(zip(keys_d, inputData)), index=[0])

    y_pred = model2.predict(df)[0]
    #predicting recommendations
    rec1 = industry_siteeui_rec_model.predict([[inputData[3]]])
    rec2 = industry_sourceeui_rec_model.predict([[inputData[4]]])

    print(f"idhar answer h -> {type(inputData)}")
    # prediction.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify([round(y_pred, 3), site_eui_recommend[rec1[0]], source_eui_recommend[rec2[0]]])


if __name__ == "__main__":
    app.run(debug=True)
