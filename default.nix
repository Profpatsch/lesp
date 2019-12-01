let pkgs = import <nixpkgs> {};

  buildTreeSitterGrammar = { grammarName, grammarJs, corpus }: pkgs.stdenv.mkDerivation {
    name = grammarName;

    phases = [ "buildPhase" "checkPhase" "installPhase" "fixupPhase" ];

    outputs = [ "lib" ];

    nativeBuildInputs = with pkgs; [
      tree-sitter
      nodejs
      gcc
    ];

    buildPhase = ''
      export HOME=$(mktemp -d)
      cp ${grammarJs} grammar.js
      find
      tree-sitter generate
      cp -r ${corpus} corpus
      tree-sitter test
    '';

    installPhase = ''
      mkdir -p $lib/lib
      cp ${grammarName}.so $lib/lib/
    '';
  };

in buildTreeSitterGrammar {
  grammarName = "lesp";
  grammarJs = ./grammar/grammar.js;
  corpus = ./grammar/corpus;
}
