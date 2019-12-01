let
  pkgs = import <nixpkgs> {};

in
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      tree-sitter
      nodejs
      rustc rustfmt cargo
      gcc
    ];
  }
