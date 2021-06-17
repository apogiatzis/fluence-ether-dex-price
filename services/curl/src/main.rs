#![allow(improper_ctypes)]

use fluence::marine;
use fluence::MountedBinaryStringResult;
use fluence::MountedBinaryResult as Result;

fn main() {}

#[marine]
pub fn post_request(url: String, data: String) -> MountedBinaryStringResult{
    curl(vec!["-sS".into(), "-X".into(),"POST".into(), "-d".into(), data.into(), url]).stringify().unwrap()
}


#[marine]
pub fn get_request(url: String) -> MountedBinaryStringResult{
    curl(vec!["-sS".into(), url]).stringify().unwrap()
}

#[marine]
#[link(wasm_import_module = "host")]
extern "C" {
    pub fn curl(cmd: Vec<String>) -> Result;
}
