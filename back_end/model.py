from textgenrnn import textgenrnn
textgen = textgenrnn(weights_path='colaboratory_weights.hdf5',vocab_path='colaboratory_vocab.json',config_path='colaboratory_config.json')

def predict():
	y=textgen.generate(return_as_list=True,max_gen_length=200,temperature=[1.0])
	return y[0]

