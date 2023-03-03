name: Report a bug
description: Tell us about a bug or issue you may have identified in Tatum SDK.
title: "Provide a general summary of the issue"
labels: [bug]
assignees: "-"
body:
- type: textarea
  id: what-happened
  attributes:
  label: Describe the issue
  description: Provide a summary of the issue and what you expected to happen, including specific steps to reproduce.
  validations:
  required: true
- type: dropdown
  id: os
  attributes:
  label: What operating system(s) are you seeing the problem on?
  multiple: true
  options:
  - Windows
  - macOS
  - Android
  - iOS
  - Linux
  validations:
  required: true
- type: dropdown
  id: environment
  attributes:
  label: What environment do you see the problem on (Browser/Node)?
  options:
  - Browser
  - NodeJS
  validations:
  required: true
- type: input
  id: environment-version
  attributes:
  label: What version of NodeJS/Browser are you using?
  placeholder: "16"
  validations:
  required: true
- type: input
  id: version
  attributes:
  label: What version of Tatum SDK are you using?
  placeholder: "e.g., v2.0.0"
  validations:
  required: true
