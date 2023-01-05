make: install_deps build_dist

install_deps:
		@echo Installing dependencies...
		npm install

build_dist:
		@echo Building the API...
		npm run build

clean:
		echo Cleaning up...
		rm -rf node_modules
		rm -rf build
