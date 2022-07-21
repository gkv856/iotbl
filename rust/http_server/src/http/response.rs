use core::fmt;
/*

    HTTP/1.1 200 OK
    headers

    Hello World!

*/
use super::StatusCode;
use std::fmt::{Display, Formatter, Result as fmtResult};
use std::io::{Result as IOResult, Write};
use std::net::TcpStream;

pub struct Response {
    status_code: StatusCode,
    body: Option<String>,
}

impl Response {
    pub fn new(status_code: StatusCode, body: Option<String>) -> Self {
        Response { status_code, body }
    }

    pub fn send(&self, stream: &mut TcpStream) -> IOResult<()> {
        let body = match &self.body {
            Some(b) => b,
            None => "",
        };

        write!(
            stream,
            "HTTP/1.1 {} {} \r\n\r\n{}",
            self.status_code,
            self.status_code.status_reason(),
            body
        )
    }
}
