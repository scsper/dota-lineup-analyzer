run:
	python server/driver.py

clean:
	rm *.pyc
	rm -rf ./server/static/*

cookbook:
	git clone git://github.com/opscode-cookbooks/apache2.git cookbooks/apache2
	git clone git://github.com/opscode-cookbooks/apt.git cookbooks/apt
	git clone git://github.com/opscode-cookbooks/build-essential.git cookbooks/build-essential
	git clone git://github.com/opscode-cookbooks/git.git cookbooks/git
	git clone git://github.com/opscode-cookbooks/vim.git cookbooks/vim
	git clone git://github.com/opscode-cookbooks/vim.git cookbooks/make

install:
	sudo apt-get install python-pip
	pip install requests
	pip install flask

build:
	rm -rf ./server/static/*
	cp -r ./client/* ./server/static

server: build
	python ./server/app.py
