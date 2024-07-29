GET http://localhost:3002/getQuote
HTTP 200
[Asserts]
jsonpath "$.quote" == ""
jsonpath "$.author" != ""
