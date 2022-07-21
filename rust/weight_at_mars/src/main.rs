use std::io;

fn main() {

    let mut input = String::new();


    println!("Enter weight on Earth to convert it for Mars: ");
    io::stdin().read_line( &mut input).unwrap();

    let weight_as_float: f32 = input.trim().parse().unwrap();

    let result: f32 = convert_to_mars_weight(weight_as_float);
    println!("Weight on Mars is {} kgs", result);
}

fn convert_to_mars_weight(weight:f32 ) -> f32 {
    (weight / 9.81) * 3.711
}
