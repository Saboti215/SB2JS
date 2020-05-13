"use strict";

const convertSB2JS = c => {
  let js = c
  .replace( // Convert End of Blocks
    /(EndIf)|(EndFor)|(EndWhile)|(EndSub)/gi,
    "}"
  )
  .replace( // Replace For loop with Step
    /For ([a-zA-Z0-9]+) = ([a-zA-Z0-9]+) To ([a-zA-Z0-9]+) Step ((-|\+)?[0-9]+)/gi,
    "for (let $1 = $2; $1 <= $3; $1+=$4){"
  )
  .replace( // Replace For loop without Step
    /For ([a-zA-Z0-9]+) = ([a-zA-Z0-9]+) To ([a-zA-Z0-9]+)/gi,
    "for (let $1 = $2; $1 <= $3; $1++){"
  )
  .replace( // Replace unequal
    /(<>)/gi,
    "!="
  )
  .replace( // Replace TextWindow.WriteLine
    /TextWindow.WriteLine\((.*)\)/gi,
    "console.log($1 + '\\n');"
  )
  .replace( // Replace TextWindow.Write
    /TextWindow.Write\((.*)\)/gi,
    "console.log($1);"
  )
  .replace( // Replace and
    / AND /gi,
    " && "
  )
  .replace( // Replace or
    / OR /gi,
    " || "
  )
  .replace( // Replace If
    /If (.*) Then/gi,
    "if ($1) {"
  )
  .replace( // Replace ElseIf
    /ElseIf (.*) Then/gi,
    "} else if ($1) {"
  )
  .replace( // Replace Else
    /Else /gi,
    "} else {"
  )
  .replace( // Replace While
    /While (.*)$/gi,
    "while ($1) {"
  )
  .replace( // Replace comments
    /(.*)'(.*)/gi,
    "$1//$2"
  )

  js = js.replace( // Add ; after every line which doesn't end with { or }
    /^(.*)(?<!({|}))$/gi,
    "$1;"
  )

  return js;
}