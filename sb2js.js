"use strict";

const convertSB2JS = c => {
  let js = c.replace( // Remove leading spaces
    /^(.*)/gim,
    "$1"
  )
  js = convertMathMethods(js) // Convert whole Math Library
  js = convertTextMethods(js) // Convert whole Text Library
  js = convertArrays(js) // Convert everything about arrays
  js = js
  .replace( // Convert End of Blocks
    /(EndIf$)|(EndFor$)|(EndWhile$)|(EndSub$)/gim,
    "}"
  )
  .replace( // COnverts constants
    /CONST (.*)/gim,
    "const $1"
  )
  .replace( // Replace For loop without Step
    /For ([a-zA-Z0-9_$]+) = ([a-zA-Z0-9_$]+) To ([a-zA-Z0-9_$]+)$/gim,
    "for (let $1 = $2; $1 <= $3; $1++){"
  )
  .replace( // Replace For loop with Step
    /For ([a-zA-Z0-9_$]+) = ([a-zA-Z0-9_$&]+) To ([a-zA-Z0-9_$&]+) Step ([a-zA-Z0-9_$&]+)/gim,
    "for (let $1 = $2; $1 <= $3; $1+=$4){"
  )
  .replace( // Convert Variable initialisation
    /^([a-zA-Z0-9_$]*\s*=.*)$/gim,
    "let $1"
  )
  .replace( // Replace unequal
    /(<>)/gim,
    "!="
  )
  .replace( // Replace TextWindow.WriteLine and .Write
    /TextWindow.Write(Line)?\((.*)\)/gim,
    "console.log($2)"
  )
  .replace( // Replace TextWindow.Read
    /TextWindow.Read\((.*)\)/gim,
    "//prompt('Please insert your data')"
  )
  .replace( // Replace and
    / AND /gim,
    " && "
  )
  .replace( // Replace or
    / OR /gim,
    " || "
  )
  .replace( // Replace If
    /If\s*(.+)\s*Then/gim,
    "if ($1) {"
  )
  .replace( // Replace ElseIf
    /ElseIf\s*(.*)\s*Then/gim,
    "} else if ($1) {"
  )
  .replace( // Replace Else
    /Else/gim,
    "} else {"
  )
  .replace( // Replace While
    /While\s*(.*)/gim,
    "while ($1) {"
  )
  .replace( // Replace comments
    /(.*)'(.*)/gim,
    "$1//$2"
  )
  .replace( // Replace True
    /True/gim,
    "true"
  )
  .replace( // Replace True
    /False/gim,
    "false"
  )
  .replace( // Replace Subs
    /Sub (.+)/gim,
    "function $1 () {"
  )
  .replace( // Add ; after every line which doesn't end with { or }
    /^(.+)(?<!({|}))$/gim,
    "$1;"
  )
  // TODO:
  // Change = to ==, but only in conditions

  return js;
}

const convertArrays = s => {
  // Benutzer[1] = "Tim" Same Syntax as in JS, so we do not have to convert this
  return s
  .replace(
    /Array.ContainsIndex\((.*),(.*)\)/gim,
    "$1[$2]!==undefiend"
  )
  .replace(
    /Array.ContainsValue\((.*),(.*)\)/gim,
    "$1.includes($2)"
  )
  .replace(
    /Array.GetAllIndices\((.*)\)/gim,
    "Object.keys($1)"
  )
  .replace(
    /Array.GetItemCount\((.*)\)/gim,
    "$1.length"
  )
  .replace(
    /Array.IsArray\((.*)\)/gim,
    "Array.isArray($1)"
  )
  .replace(
    /Array.SetValue\((.*),(.*),(.*)\)/gim,
    "$1[$2] = $3"
  )
  .replace(
    /Array.GetValue\((.*),(.*)\)/gim,
    "$1[$2]"
  )
  .replace(
    /Array.RemoveValue\((.*),(.*)\)/gim,
    "delete $1[$2]"
  )
}

const convertTextMethods = s => {
  return s
  .replace(
    /Text.Append\((.*),(.*)\)/gim,
    "$1.concat($2)"
  )
  .replace(
    /Text.GetLength\((.*)\)/gim,
    "$1.length"
  )
  .replace(
    /Text.IsSubText\((.*),(.*)\)/gim,
    "$1.includes($2)"
  )
  .replace(
    /Text.EndsWith\((.*),(.*)\)/gim,
    "$1.endsWith($2)"
  )
  .replace(
    /Text.StartsWith\((.*),(.*)\)/gim,
    "$1.startsWith($2)"
  )
  .replace(
    /Text.GetSubTextToEnd\((.*),(.*)\)/gim,
    "$1.substr($2)"
  )
  .replace(
    /Text.GetIndexOf\((.*),(.*)\)/gim,
    "$1.indexOf($2)"
  )
  .replace(
    /Text.ConvertToLowerCase\((.*)\)/gim,
    "$1.toLowerCase()"
  )
  .replace(
    /Text.ConvertToUpperCase\((.*)\)/gim,
    "$1.toUpperCase()"
  )
  .replace(
    /Text.GetCharacter\((.*)\)/gim,
    "String.fromCharCode($1)"
  )
  .replace(
    /Text.GetCharacterCode\((.*)\)/gim,
    "$1.charCodeAt()"
  )
}

const convertMathMethods = s => {
  return s
  .replace(
    /Math.Abs\((.*)\)/gim,
    "Math.abs($1)"
  )
  .replace(
    /Math.Ceiling\((.*)\)/gim,
    "Math.ceil($1)"
  )
  .replace(
    /Math.Floor\((.*)\)/gim,
    "Math.floor($1)"
  )
  .replace(
    /Math.NaturalLog\((.*)\)/gim,
    "Math.log($1)"
  )
  .replace(
    /Math.Log\((.*)\)/gim,
    "Math.log10($1)"
  )
  .replace(
    /Math.Cos\((.*)\)/gim,
    "Math.cos($1)"
  )
  .replace(
    /Math.Sin\((.*)\)/gim,
    "Math.sin($1)"
  )
  .replace(
    /Math.Tan\((.*)\)/gim,
    "Math.tan($1)"
  )
  .replace(
    /Math.ArcTan\((.*)\)/gim,
    "Math.atan($1)"
  )
  .replace(
    /Math.ArcSin\((.*)\)/gim,
    "Math.asin($1)"
  )
  .replace(
    /Math.ArcCos\((.*)\)/gim,
    "Math.acos($1)"
  )
  .replace(
    /Math.SquareRoot\((.*)\)/gim,
    "Math.sqrt($1)"
  )
  .replace(
    /Math.Power\((.*),(.*)\)/gim,
    "Math.pow($1,$2)"
  )
  .replace(
    /Math.Round\((.*)\)/gim,
    "Math.round($1)"
  )
  .replace(
    /Math.Max\((.*),(.*)\)/gim,
    "Math.max($1,$2)"
  )
  .replace(
    /Math.Min\((.*),(.*)\)/gim,
    "Math.min($1,$2)"
  )
  .replace(
    /Math.Remainder\((.*),(.*)\)/gim,
    "$1%$2"
  )
  /**
   * Missing functions:
   * - GetDegrees
   * - GetRadians
   * - GetRandomNumber
   * - DoubleToDecimal
   */
}