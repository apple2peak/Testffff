#coding:utf-8
__author__ = 'Administrator'
import xlrd

def readexcel(file_path):
    case_list=[]
    data =xlrd.open_workbook(file_path)
    sheet = data.sheet_by_index(0)
    nrows =sheet.nrows
    ncols = sheet.ncols
    for i in range(nrows):
        if i !=0:
            case_list.append(sheet.row_values(i))  #获取每行的值
            print case_list
readexcel("F:\\data.xlsx")

