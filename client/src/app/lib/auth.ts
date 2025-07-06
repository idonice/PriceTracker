import { LoginSchema, RegisterSchema } from "./schemas/auth_schema";

export async function login(loginData: LoginSchema) {
  console.log("Sending login request with:", loginData);
  const response = await fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.accessToken);
  return data;
}

export async function signup(registerData: RegisterSchema) {
  console.log("Sending registration request with:", registerData);
  const response = await fetch(`http://localhost:8080/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.accessToken);
  return data;
}
