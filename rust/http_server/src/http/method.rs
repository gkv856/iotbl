use std::fmt::Debug;
use std::str::FromStr;

#[derive(Debug)]
pub enum Method {
    GET,
    HEAD,
    POST,
    PUT,
    DELETE,
    CONNECT,
    OPTIONS,
    TRACE,
    PATCH, //The PATCH method applies partial modifications to a resource.
           //The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
           //The HEAD method asks for a response identical to a GET request, but without the response body.
           //The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
           //The PUT method replaces all current representations of the target resource with the request payload.
           //The DELETE method deletes the specified resource.
           //The CONNECT method establishes a tunnel to the server identified by the target resource.
           //The OPTIONS method describes the communication options for the target resource.
           //The TRACE method performs a message loop-back test along the path to the target resource.
}

impl FromStr for Method {
    type Err = MethodError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_uppercase().as_str() {
            "GET" => Ok(Method::GET),
            "HEAD" => Ok(Method::HEAD),
            "POST" => Ok(Method::POST),
            "PUT" => Ok(Method::PUT),
            "DELETE" => Ok(Method::DELETE),
            "CONNECT" => Ok(Method::CONNECT),
            "OPTIONS" => Ok(Method::OPTIONS),
            "TRACE" => Ok(Method::TRACE),
            "PATCH" => Ok(Method::PATCH),
            _ => Err(MethodError),
        }
    }
}

pub struct MethodError;
