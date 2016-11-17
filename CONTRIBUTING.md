# Contributing

Contributions are welcome.

## Installation

Clone the project then install dependencies:

```
npm i
```

Then start hacking around.

## Tests

Launch unit tests and linter:

```
npm run lint
npm test
```

## Pull Request

Please create "atomic PRs" (one feature or fix by PR) and make sure your code is well tested and
there are no unexpected reggressions.

Then add a line in CHANGELOG.md with your changes under `Unreleased` section, for example:

```md
## [Unreleased]

### Fixed

  - Make things work
```

Create the Pull Request, a maintainer will do a review a soon as possible.


## Release

Make sure the build is green, then:

```bash
scripts/release-lib <version>
npm publish
```

The previous command uses the `release` script in `prepublish`. The script will do the following
operations:

* `release:clean:dist`
* `build`
* `release:copy:typesfiles` copy flow-types into `dist` directory

If there is no errors it will publish the package on npm.

## Code of conduct

Be nice. Thanks.

## Contributors

_(People who have been involved in @gandi/react-translate)_

* Pascal Duez @pascalduez
* Julien Muetton @themouette
* Paul Dijou @pauldijou
* Yann Brelière @yanndinendal
* Benoît Bar @benoitbar
* Alexis Mineaud @cr0cK
* Arthur Gautier @baloo
* Timothée Pillard @ziir
* Michel Nemnom @Pegase745
* Alexis Couronne @skitoo
* David Epely @iamdey
