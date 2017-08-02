#coding=utf-8
__author__ = 'Administrator'
from flask import *
from condition import conditionTest
app =Flask(__name__)


@app.route('/index')
def index():
    case_list=conditionTest.resFileExcel()
    return  render_template("table.html",data=case_list)


if __name__ == '__main__':
    app.debug=True
    app.run(host="0.0.0.0",port=80,debug=True)
