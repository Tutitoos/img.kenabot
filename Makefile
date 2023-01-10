make: install_deps build_dist

install_deps:
		@echo Installing dependencies...
		npm install

build_dist:
		@echo Building the API...
		npm run build

publish:
		docker buildx build --platform linux/amd64,linux/arm64  -t holasoyender/img.kenabot.xyz:latest --push .

clean:
		@echo Cleaning up...
		rm -rf node_modules
		rm -rf build
