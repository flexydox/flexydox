# Contributing to flexydox

✨ Thank you for considering contributing to FlexyDox! ✨

This document outlines some guidelines to help you get started with contributing to this project. 


We also recommend that you read [How to Contribute to Open Source](https://opensource.guide/how-to-contribute).

As a contributor, here are the guidelines we would like you to follow:

- [Code of conduct](#code-of-conduct)
- [How can I contribute?](#how-can-i-contribute)
- [Using the issue tracker](#using-the-issue-tracker)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding rules](#coding-rules)

## Code of conduct

Help us keep **flexydox** open and inclusive. Please read and follow our [Code of conduct](CODE_OF_CONDUCT.md).

## How can I contribute?

### Give feedback on issues

Some issues are created without information requested in the [Bug report guideline](#bug-report).
Help make them easier to resolve by adding any relevant information.

Participating in the discussion is a good opportunity to get involved and influence the future direction of **flexydox**.

### Fix bugs and implement features

Confirmed bugs and ready-to-implement features are marked with the **help wanted** label.
Post a comment on an issue to indicate you would like to work on it and to request help from the maintainers and the community.

## Using the issue tracker

The [Github issue tracker](https://github.com/flexydox/flexydox/issues) is the channel for bug reports, features requests and submitting pull requests only.
Please use [GitHub Discussions](https://github.com/flexydox/flexydox/discussions) for support, troubleshooting and questions.

Before opening an issue or a Pull Request, please use the [Github issue tracker](https://github.com/flexydox/flexydox/issues) to make sure the bug or feature request hasn't been already reported or fixed.

### Bug report

A good bug report shouldn't leave others needing to chase you for more information.
Please try to be as detailed as possible in your report and fill the information requested in the [bug report template](https://github.com/flexydox/flexydox/issues/new?template=1-bug-report.yaml).

### Feature request

Feature requests are welcome, but take a moment to find out whether your idea fits with the scope and aims of the project.
It's up to you to make a strong case to convince the project's developers of the merits of this feature.
Please provide as much detail and context as possible and fill the information requested in the [feature request template](https://github.com/flexydox/flexydox/issues/new?template=2-feature-request.yaml).



## Submitting a Pull Request

Good pull requests, whether patches, improvements, or new features, are a fantastic help.
They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull requests (e.g. implementing features, refactoring code), otherwise you risk spending a lot of time working on something that the project's maintainers might not want to merge into the project.

If you have never created a pull request before, welcome 🎉 😄.
[Here is a great tutorial](https://opensource.guide/how-to-contribute/#opening-a-pull-request) on how to send one :)

Here is a summary of the steps to follow:

1. [Fork](https://guides.github.com/activities/forking/#fork) the project, [clone](https://guides.github.com/activities/forking/#clone) your fork, configure the remotes and install the dependencies:

```bash
pnpm install
```

1. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

```bash
$ git checkout -b <topic-branch-name>
```

1. Make your code changes, following the [Coding rules](#coding-rules)
1. Push your topic branch up to your fork:

```bash
$ git push origin <topic-branch-name>
```

1. [Open a Pull Request](https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request) with a clear title and description.

**Tips**:

- For ambitious tasks, open a Pull Request as soon as possible with the `[WIP]` prefix in the title, in order to get feedback and help from the community.
- [Allow flexydox maintainers to make changes to your Pull Request branch](https://help.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork).
  This way, we can rebase it and make some minor changes if necessary.
  All changes we make will be done in new commit, and we'll ask for your approval before merging them.

## Coding rules

### Source code

To ensure consistency and quality throughout the source code, all code modifications must have:

- No [linting](#lint) errors
- All features or bug fixes must be tested by one or more specs (unit-tests).
- [Valid commit message(s)](#commit-message-guidelines)
- Documentation for new features
- Updated documentation for modified features

### Documentation

To ensure consistency and quality, all documentation modifications must:

- Use [links](https://help.github.com/articles/basic-writing-and-formatting-syntax/#links) when you are referring to:
  - a **flexydox** concept described somewhere else in the documentation, i.e. How to [contribute](CONTRIBUTING.md)
  - a third-party product/brand/service, i.e. Integrate with [GitHub](https://github.com)
  - an external concept or feature, i.e. Create a [GitHub release](https://help.github.com/articles/creating-releases)
- Use the [single backtick `code` quoting](https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code) for:
  - commands inside sentences, i.e. the `flexydox` command
  - programming language keywords, i.e. `function`, `async`, `String`
- Use the [triple backtick `code` formatting](https://help.github.com/articles/creating-and-highlighting-code-blocks) for:
  - code examples
  - configuration examples
  - sequence of command lines

### Commit message guidelines

#### Atomic commits

If possible, make [atomic commits](https://en.wikipedia.org/wiki/Atomic_commit), which means:

- a commit should contain exactly one self-contained functional change
- a functional change should be contained in exactly one commit
- a commit should not create an inconsistent state (such as test errors, linting errors, partial fix, feature without documentation, etc...)

A complex feature can be broken down into multiple commits as long as each one maintains a consistent state and consists of a self-contained change.

#### Commit message format

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-message-header) format.

The `body` is mandatory for all commits except for those of type "docs".
When the body is present it must be at least 20 characters long and must conform to the [Commit Message Body](#commit-message-body) format.

The `footer` is optional. The [Commit Message Footer](#commit-message-footer) format describes what the footer is used for and the structure it must have.


#### Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: cli|cli-e2e|doc-schema|doc-provider|logger|renderer
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

#### Scope
The scope should be the name of the pnpm package affected (as perceived by the person reading the changelog generated from commit messages).

##### Type

The type must be one of the following:

| Type         | Description                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| **build**    | Changes that affect the build system or external dependencies                                               |
| **docs**     | Documentation only changes                                                                                  |
| **feat**     | A new feature                                                                                               |
| **fix**      | A bug fix                                                                                                   |
| **perf**     | A code change that improves performance                                                                     |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                                   |
| **style**    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| **test**     | Adding missing tests or correcting existing tests 

###### Summary

Use the summary field to provide a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end




#### Commit Message Body

Just as in the summary, use the imperative, present tense: "fix" not "fixed" nor "fixes".

Explain the motivation for the change in the commit message body. This commit message should explain _why_ you are making the change.
You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.


#### Commit Message Footer

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, and other PRs that this commit closes or is related to.
For example:

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with "DEPRECATED: " followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.




#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.



