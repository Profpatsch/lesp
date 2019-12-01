use tree_sitter as ts;

extern "C" {
    fn tree_sitter_lesp() -> ts::Language;
}

fn main() {
    let language = unsafe { tree_sitter_lesp() };
    let mut parser = ts::Parser::new();
    parser.set_language(language).unwrap();

    println!("{:#?}", parser.parse("(hello world", None).unwrap().root_node())
}
