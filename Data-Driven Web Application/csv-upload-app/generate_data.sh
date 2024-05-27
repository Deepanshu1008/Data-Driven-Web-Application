#!/bin/bash

# Function to generate a random name
generate_name() {
    first_names=("John" "Jane" "Michael" "Emily" "David" "Sarah" "James" "Anna" "Robert" "Emma")
    last_names=("Smith" "Johnson" "Williams" "Jones" "Brown" "Davis" "Miller" "Wilson" "Moore" "Taylor")
    
    first_name=${first_names[$RANDOM % ${#first_names[@]}]}
    last_name=${last_names[$RANDOM % ${#last_names[@]}]}
    echo "$first_name $last_name"
}

# Function to generate masked phone numbers
mask_phone_number() {
    phone_number=$1
    masked_number="***-***-${phone_number: -4}"
    echo "$masked_number"
}

# Generate CSV file with user data
csv_file="user_data.csv"
echo "Email,Name,CreditScore,CreditLines,MaskedPhoneNumber" > "$csv_file"

# Use an array to hold all the data
declare -a data_array

for (( i=1; i<=200000; i++ )); do
    email="user${i}@example.com"
    name=$(generate_name)
    credit_score=$((500 + RANDOM % 351)) # Random credit score between 500 and 850
    credit_lines=$((1 + RANDOM % 5))     # Random credit lines between 1 and 5
    phone_number=$(printf "%09d" $((100000000 + RANDOM % 900000000))) # Random 9-digit phone number

    masked_phone=$(mask_phone_number "$phone_number")

    data_array+=("$email,$name,$credit_score,$credit_lines,$masked_phone")
done

# Join the array into a single string with newlines
data=$(printf "%s\n" "${data_array[@]}")

# Write all data to the CSV file at once
echo "$data" >> "$csv_file"

echo "CSV file generated successfully."
