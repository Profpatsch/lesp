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
                // escaping the escape character \
                seq('\\', '\\'),
                // escaping all parens
                seq('\\', '('),
                seq('\\', ')'),
                seq('\\', '['),
                seq('\\', ']'),
                seq('\\', '{'),
                // escaping = (for attrlists)
                // TODO: this should probably be only necessary inside {}
                seq('\\', '='),
                seq('\\', '}'),
                // spaces can be escaped if absolutely necessary (e.g. for dict attributes with spaces)
                seq('\\', ' '),
                /[^\\()\[\]{=}\s]/,
            ))
        )

    },

    extras: $ => [/\s+/]

});
