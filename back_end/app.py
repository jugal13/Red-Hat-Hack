import flask
from flask import request, json, jsonify,session
from textgenrnn import textgenrnn

def add_cors_header(response):
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'HEAD,OPTIONS,GET,POST,PUT,DELETE'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
  response.headers['Access-Control-Expose-Headers'] = 'content-range'
  response.headers['Access-Control-Allow-Credentials'] = 'true'
  response.headers['Content-Type'] = 'application/json; charset=utf-8'
  response.headers['Content-range'] = 'review 1-10/10'
  return response

textgen = textgenrnn(weights_path='colaboratory_weights.hdf5',vocab_path='colaboratory_vocab.json',config_path='colaboratory_config.json')

def predict():
	y=textgen.generate(return_as_list=True,max_gen_length=200,temperature=[1.0])
	return y[0]

predict()
app=flask.Flask(__name__)
app.config["DEBUG"]=True

app.after_request(add_cors_header)

@app.route('/code',methods=['POST'])
def read_val():
	content = request.get_json()
	session['code']=content
	return "success"

@app.route('/review',methods=['GET'])
def predict():
	y=textgen.generate(return_as_list=True,max_gen_length=200,temperature=[1.0])
	return json.dumps([{"text":y[0]}])

app.secret_key="adfdg"
app.run()
