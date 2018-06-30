local http = require "resty.http"
local cjson = require "cjson"

local auth_header = ngx.req.get_headers().Authorization

if not auth_header then
    ngx.status = ngx.HTTP_BAD_REQUEST
    ngx.say("Require auth header")
    return
end

local session_id = auth_header:match("([^Bearer ].+)")
local httpc = http.new()
local res, err = httpc:request_uri('http://127.0.0.1:3000/jwt/' .. session_id, {
  method = "GET"
})

if err then
  ngx.status = ngx.HTTP_SERVER_ERROR
  ngx.say("failed to request: ", err)
  return
end

if res.status == 401 or res.status == 403 then
  ngx.status = res.status
  ngx.say("not authorized")
  return
end

if res.status ~= 200 then
  ngx.status = res.status
  ngx.say("not authorized")
  return
end

local jwt = cjson.decode(res.body).jwt

ngx.req.set_header('Authorization', 'Bearer ' .. jwt)