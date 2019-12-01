module.exports = grammar({
    name: 'lesp',

    rules: {

        expr: $ => repeat1(choice($.sexp, $.list, $.dict, $.string)),

        sexp: $ => seq(
            '(',
            alias($.string, "sexp_name"),
            optional($.expr),
            ')'),

        // lists are flat (for now?)
        list: $ => seq('[', repeat1($.string), ']'),

        // dicts are also flat (for now?)
        dict: $ => seq('{', repeat1($.dict_elem), '}'),
        dict_elem: $ => seq(
            alias($.string, "dict_key"),
            '=',
            alias($.string, "dict_val")),

        string: $ => token(
            repeat1(choice(
                seq('\\', '\\'),
                seq('\\', '('),
                seq('\\', ')'),
                seq('\\', '['),
                seq('\\', ']'),
                seq('\\', '{'),
                seq('\\', '='),
                seq('\\', '}'),
                /[^\\()\[\]{=}\s]/,
            ))
        )

    },

    extras: $ => [/\s+/]

});
