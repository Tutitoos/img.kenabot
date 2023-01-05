installDependencies:
  npm install

build:
	npm run build
	npm run start


make:
  installDependencies
  build
