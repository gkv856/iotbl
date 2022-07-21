use std::collections::HashMap;
use std::fmt::Debug;

#[derive(Debug)]
pub struct QueryString<'in_buf_stream> {
    data: HashMap<&'in_buf_stream str, Value<'in_buf_stream>>,
}

#[derive(Debug)]
pub enum Value<'in_buf_stream> {
    Single(&'in_buf_stream str),
    Multiple(Vec<&'in_buf_stream str>),
}

impl<'in_buf_stream> QueryString<'in_buf_stream> {
    pub fn get(&self, key: &str) -> Option<&Value> {
        self.data.get(key)
    }
}

// GET /searchbooks?name=abc&title=123&a=1&b=&c&a=xyz HTTP/1.1\r\n..HEADERS...

impl<'in_buf_stream> From<&'in_buf_stream str> for QueryString<'in_buf_stream> {
    fn from(s: &'in_buf_stream str) -> Self {
        let mut data = HashMap::new();

        for sub_str in s.split('&') {
            let mut key = sub_str;
            let mut val = "";

            if let Some(i) = sub_str.find("=") {
                key = &sub_str[..i];
                val = &sub_str[i + 1..];
            }

            // 1. they key does not exist, in that case , we just insert it to the hashmap
            // 2. is key does exist and it is sigle, we need to convert to multiple type
            // 3. key does exist and its already multiple type, then we just push a value

            data.entry(key)
                .and_modify(|existing_map| match existing_map {
                    Value::Single(old_val) => {
                        *existing_map = Value::Multiple(vec![old_val, val]);
                    }
                    Value::Multiple(vec) => vec.push(val),
                })
                .or_insert(Value::Single(val));
        }

        QueryString { data: data }
    }
}
