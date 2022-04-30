# Backend

	npm install
	npm start

# Frontend

	npm install
	quasar dev

# Data Base


	CREATE TABLE Department (
    	DepartmentID INT PRIMARY KEY IDENTITY,
    	NumberWorkers INT CHECKNumberWorkers > 0 AND NumberWorkers < 101) NOT NULL,
	)

	CREATE TABLE Worker (
    	WorkerID INT PRIMARY KEY IDENTITY,
    	Surname VARCHAR(40) NOT NULL,
    	Name VARCHAR(40) NOT NULL,
    	Patronymic VARCHAR(40) NOT NULL,
    	Position VARCHAR(40) NOT NULL,
    	Experience INT CHECK(Experience > 0 AND Experience < 41) NOT NULL,
    	DepartmentID INT REFERENCES Department (DepartmentID) NOT NULL
	)

	CREATE TABLE TypeExpense (
    	ViewID INT PRIMARY KEY IDENTITY,
    	Name VARCHAR(40) NOT NULL,
    	Description VARCHAR(40)
	)

