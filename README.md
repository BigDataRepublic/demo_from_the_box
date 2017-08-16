# Demo from the box
This project is intended for data scientists who want to create a quick and easy demo of their data science model in jupyter

We purpously included all the front-end libraries as well as the bower.json to install them to make the threshold of using this project as low as possible.

#Host demo from notebook
**Step 1**

Make sure you have defined a trained scikit model under the *trained_model* variable and your input features under *x* like:

	x = data_frame.drop(['Label'],1)
	trained_model = model.fit(x,y)

**Step 2**

Copy the follwing code into your notebook cell and run to start a http interface on port 5777 from your notebook

	from flask import Flask, jsonify, request
	from flask_cors import CORS, cross_origin
	app = Flask(__name__)
	CORS(app)
	
	@app.route("/predict",methods=['POST'])
	@cross_origin()
	def predict():
	    input_data = request.get_json()
	    print("Received input data: {}".format(str(input_data)))
	    if input_data==None:
	        print("Empty data received")
	        return
	    input_df = pd.DataFrame.from_dict([input_data])
	    prediction = trained_model.predict(input_df)
	    print(prediction)
	    return jsonify({"prediction": str(prediction[0])})
	
	@app.route("/input_features")
	@cross_origin()
	def input_features():
	    return jsonify(x.columns.tolist())
	
	@app.route("/example_input")
	@cross_origin()
	def example_input():
	    return x.iloc[0].to_json()
	
	app.run(host='0.0.0.0', port=5777, debug=False, threaded=True)

#Host demo web interface
**Step 1** 


	python webserver.py


**Step 2**

	http://localhost:8000

# Demo
A demo notebook to host a demo can be found in the demo_of_demo folder