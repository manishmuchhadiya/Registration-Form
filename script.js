let userData = JSON.parse(localStorage.getItem("user"));// Get data from local storage

        // Check if the data exists and is an array
        if (userData && Array.isArray(userData)) {
            // Get the table element
            let table = document.getElementById("registrationTable");

            // Loop through the userData array
            for (let i = 0; i < userData.length; i++) {

                let row = table.insertRow(); // Create a new row

                // Insert cells for the name, dob, email, and password
                let nameCell = row.insertCell(0);
                let emailCell = row.insertCell(1);
                let passwordCell = row.insertCell(2);
                let dobCell = row.insertCell(3);
                let t_and_cCell = row.insertCell(4);

                // Set the cell values
                nameCell.innerHTML = userData[i].name;
                emailCell.innerHTML = userData[i].email;
                passwordCell.innerHTML = userData[i].password;
                dobCell.innerHTML = userData[i].dob;
                t_and_cCell.innerHTML = userData[i].Accepted_terms;
                console.log("error")
            }
        }

        function validate(event) {
            event.preventDefault();

            let dob = document.getElementById("dob").value;
            const name = document.forms["myForm"]["name"].value;
            const email = document.forms["myForm"]["email"].value;
            const password = document.forms["myForm"]["password"].value;
            const errorMessage = document.getElementById("errorMessage");
            const table = document.querySelector("#registrationTable tbody");
            const checkbox = document.getElementById("checkbox");

            // birthdate calculation
            const calculateAge = (dob) => {
                const today = new Date();
                const birthDate = new Date(dob);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (
                    monthDiff < 0 ||
                    (monthDiff === 0 && today.getDate() < birthDate.getDate())
                ) {
                    age--;
                }
                return age;
            };

            const age = calculateAge(dob);
            console.log(age);

            //email validation
            const validateEmail = (email) => {
                var re =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };
            if (validateEmail(email)) {
                emailis = "valid";
            } else {
                emailis = "wrong";
            }

            errorMessage.innerHTML = "";

            let isValid = true;

            if (!name) {
                alert("Name is required.");
                isValid = false;
            }

            if (isNaN(age) || age < 18 || age > 55) {
                alert("age must between 18 to 55");
                isValid = false;
            }

            if (emailis === "wrong") {
                alert("please enter valid email");
                isValid = false;
            }

            if (!password) {
                alert("Password is required. <br>");
                isValid = false;
            }

            if (checkbox.checked) {
                checkbox_status = "true"
            } else {
                checkbox_status = "false"
            }

            if (isValid) {
                console.log("yes");

                // Get the current data from local storage
                let data = JSON.parse(localStorage.getItem("user")) || [];

                // Add the new user data to the array
                data.push({
                    name: name,
                    email: email,
                    password: password,
                    dob: dob,
                    Accepted_terms: checkbox_status,
                });

                // Store the updated data back in local storage
                localStorage.setItem("user", JSON.stringify(data));

                const row = document.createElement("tr");
                row.innerHTML = `
     <td>${name}</td>
     <td>${email}</td>
     <td>${password}</td>
     <td>${dob}</td>
     <td>${checkbox_status}</td>
     `;
                table.appendChild(row);

                document.getElementById("dob").value = "";
                document.forms["myForm"]["name"].value = "";
                document.forms["myForm"]["email"].value = "";
                document.forms["myForm"]["password"].value = "";
            }
        }