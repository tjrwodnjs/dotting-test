# Dotting Component test with local Dotting library

This is a repository for contributors who would like to test [dotting](https://github.com/hunkim98/dotting) locally. This repository was created since testing `dotting` locally has issues due to react and react-dom version mismatch.

This repository has referenced [how-to-test-custom-react-library-locally](https://medium.com/tri-petch-digital/how-to-test-your-custom-react-library-locally-df02595e22f)

## Prerequisites

You must have `dotting` library installed in your local machine. For this test repository to work you should run some scripts in the `dotting` library beforehand. Also, you must have this library cloned in the same directory as this repository.

### Your directory structure should look like this

```
/some-directory
├── dotting
└── dotting-test
```

## How to use

### 1. Clone `dotting` library

Go to [dotting](https://github.com/hunkim98/dotting) and clone the `dotting` project. After cloing dotting, freely edit the parts you would like to change.

### 2. Build the `dotting` library

Inside the `dotting` directory, run the following command.

```bash
yarn prepublishOnly
```

This will compile your typescript files into javascript files that can be used in other projects. **Remember that if you change anything in `dotting` and want to see the effect, you must run this command again!**

### 3. Run `link-local` script in `dotting` library

Inside the `dotting` directory, run the following command.

```bash
yarn link-local
```

This will automatically create necessary symbolic links to the `dotting`, `react`, and `react-dom` libraries. Once you have run this command, you do not need to run this command again unless you want to unlink.

### 4. Clone `dotting-test` library and install dependencies

Clone this repository. After cloning, go to the `dotting-test` directory and run the following command.

```bash
yarn install
```

### 5. Run `link-local-dotting` script in `dotting-test` library

Inside the `dotting-test` directory, run the following command.

```bash
yarn link-local-dotting
```

This will make this repository link to the libraries set in the `dotting` library.

If you see `dotting:link:../dotting` inside your package.json, it means that the linking was successful.

### 6. Run `start` script in `dotting-test` library

Inside the `dotting-test` directory, run the following command.

```bash
yarn start
```

Now the `dotting-test` project will open in your localhost!

### 7. Remove links after finishing the test

After you have done editting, you can unlink libraries. Inside the `dotting-test` directory, run the following command.

```bash
yarn unlink-local-dotting
```

Inside the `dotting` directory, run the following command.

```bash
yarn unlink-local
```

Now you have successfully unlinked the libraries.
