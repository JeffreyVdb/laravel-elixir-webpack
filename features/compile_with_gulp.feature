Feature: Compiling javascript files using webpack
  A user will be able to compile javascript files using webpack with this elixir plugin

  Scenario: Compile a single bundle "main.js"
    Given I have a clean workspace
    Given a source file "main.js"
    Given that the destination directory is "./build/js"
    When I run this elixir plugin
    Then there should be a file called "main.js" within the destination directory

