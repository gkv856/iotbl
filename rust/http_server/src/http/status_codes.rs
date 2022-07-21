use std::fmt::{Display, Formatter, Result as fmtResult};

#[derive(Clone, Copy)]
pub enum StatusCode {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    ServerError = 500,
}

impl StatusCode {
    pub fn status_reason(&self) -> &str {
        match self {
            StatusCode::OK => "OK",
            StatusCode::BadRequest => "Bad Request",
            StatusCode::NotFound => "Not Found",
            StatusCode::ServerError => "Server Error",
        }
    }
}

impl Display for StatusCode {
    fn fmt(&self, f: &mut Formatter) -> fmtResult {
        write!(f, "{}", *self as u16)
    }
}
