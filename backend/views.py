from flask import Flask, request, render_template, Blueprint, jsonify, make_response
from flask_cors import CORS, cross_origin
import cx_Oracle
import json
bp = Blueprint('general', __name__)
db_url = "amm/ar@//localhost:1521/orclpdb"

@bp.route('/', methods=['GET', 'POST'])
def index():
    return "bp working"



@bp.route('/signup/manager', methods=['POST'])
@cross_origin()
def signup_manager():
    username = request.form['username']
    password = request.form['password']
    
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()
    try:
        cursor.execute(f"""insert into users values(user_id_seq.NEXTVAL, '{username}','{password}','manager')""")
        
        conn.commit()
        cursor.close()
        conn.close()

        response = make_response({"signup" : True}, 200)
        response.headers.add("Access-Control-Allow-Origin", "*")

        return response

    except Exception as err:
        print(err)
        response = make_response({"signup" : True}, 200)
        response.headers.add("Access-Control-Allow-Origin", "*")

        return response



@bp.route('/signup/employee', methods=['POST'])
def signup_employee():
    username = request.form['username']
    password = request.form['password']
    

    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()
    try:
        cursor.execute(f"""insert into users values(user_id_seq.NEXTVAL, '{username}','{password}','employee')""")
        
        conn.commit()
        cursor.close()
        conn.close()

        return {"signup" : True}, 200

    except Exception as err:
        print(err)
        return {"signup" : False}, 400



    

@bp.route('/login', methods = ['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:
        cursor.execute(f"""select * from users where username = '{username}' and password = '{password}'""")
        fetch = cursor.fetchone()
        get_username = fetch[1]
        get_password = fetch[2]

        print(username,password)

        if(username == get_username and password == get_password):
            return {"login" : True}, 200

        else:
            return {"login": False}, 404
    except:

        return {"login": False}, 404
    
    

@bp.route('/create/supplier', methods = ['POST'])
def create_supplier():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:

        cursor.execute(f"""insert into suppliers values(supplier_id_seq.NEXTVAL,'{request.form['name']}',
        '{request.form['email']}',{request.form['phone']},'{request.form['address']}')""")
        conn.commit()
        cursor.close()
        conn.close()
        return {"done" : True}, 200

    except Exception as err:
        print(err)
        cursor.close()
        conn.close()
        return {"done" : False}, 400


    

@bp.route('/create/customer', methods = ['POST'])
def create_customer():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:

        cursor.execute(f"""insert into customers values(customer_id_seq.NEXTVAL,'{request.form['name']}',
        '{request.form['email']}','{request.form['dob']}',{request.form['points']} ,{request.form['phone']})""")
        conn.commit()
        cursor.close()
        conn.close()
        return {"done" : True}, 200

    except Exception as err:
        print(err)
        cursor.close()
        conn.close()
        return {"done" : False}, 400




@bp.route('/create/employee', methods = ['POST'])
def create_employee():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:

        cursor.execute(f"""insert into employees values(employee_id_seq.NEXTVAL,'{request.form['name']}',
        '{request.form['email']}','{request.form['dob']}' ,{request.form['phone']}, '{request.form['address']}' ,'{request.form['designation']}' ,
        '{request.form['join_date']}' )""")
        conn.commit()
        cursor.close()
        conn.close()
        return {"done" : True}, 200

    except Exception as err:
        print(err)
        cursor.close()
        conn.close()
        return {"done" : False}, 400


@bp.route('/create/product', methods = ['POST'])
def create_product():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:

        cursor.execute(f"""insert into inventory values(product_id_seq.NEXTVAL,'{request.form['product_name']}',
        '{request.form['price']}',{request.form['quantity']} ,{request.form['supplier_id']})""")
        conn.commit()
        cursor.close()
        conn.close()
        return {"done" : True}, 200

    except Exception as err:
        print(err)
        cursor.close()
        conn.close()
        return {"done" : False}, 400





@bp.route('/fetch/employees', methods = ['POST'])
def fetch_employees():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:
        if(request.form['fetch_type'] == 'all'):
            cursor.execute(f"""select * from employees""")
        
        if(request.form['fetch_type'] == 'name'):
            cursor.execute(f"""select * from employees where name = '{request.form['name']}'""")

        if(request.form['fetch_type'] == 'id'):
            cursor.execute(f"""select * from employees where employee_id = {request.form['employee_id']}""")
        
        desc=[d[0] for d in cursor.description]
        result=[dict(zip(desc, line)) for line in cursor]

        cursor.close()
        conn.close()

        return {"table" : result}, 200
    

    except Exception as err:
        print(err)
        return {"table" : False}, 400



    
@bp.route('/fetch/products', methods = ['POST'])
def fetch_products():
    conn = cx_Oracle.connect(db_url)
    cursor = conn.cursor()

    try:
        if(request.form['fetch_type'] == 'all'):
            cursor.execute(f"""select * from inventory""")
        
        if(request.form['fetch_type'] == 'name'):
            cursor.execute(f"""select * from inventory where product_name = '{request.form['product_name']}'""")

        if(request.form['fetch_type'] == 'id'):
            cursor.execute(f"""select * from inventory where product_id = {request.form['product_id']}""")
        
        desc=[d[0] for d in cursor.description]
        result=[dict(zip(desc, line)) for line in cursor]

        cursor.close()
        conn.close()

        return {"table" : result}, 200
    

    except Exception as err:
        print(err)
        return {"table" : False}, 400
