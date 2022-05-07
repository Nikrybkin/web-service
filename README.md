# Backend

    npm install
    npm start

# Frontend

    npm install
    quasar dev

# Data Base

    CREATE TABLE Department (
    	DepartmentID INT PRIMARY KEY IDENTITY,
    	NumberWorkers INT CHECK(NumberWorkers > 0 AND NumberWorkers < 101) NOT NULL,
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

    CREATE TABLE Consumption (
    	ExpenseID INT PRIMARY KEY IDENTITY,
    	WorkerID INT REFERENCES Worker (WorkerID) NOT NULL,
    	ViewID INT REFERENCES TypeExpense (ViewID) NOT NULL,
    	Date DATETIME NOT NULL,
    	Sum INT
    )

    CREATE TABLE ConsumptionRates (
        NormID INT PRIMARY KEY IDENTITY,
        DepartmentID INT REFERENCES Department (DepartmentID) NOT NULL,
        ViewID INT REFERENCES TypeExpense (ViewID) NOT NULL,
        Sum INT CHECK (Sum > 0) NOT NULL,
        Date DATETIME NOT NULL,
    )
    GO
        CREATE TRIGGER CHECK_NUMBER_WORKERS
        ON Worker
        AFTER UPDATE, INSERT
        AS
        if (select NumberWorkers from Department
        where DepartmentID=(select DepartmentID from inserted)) < (select COUNT(WorkerID) from Worker
        where DepartmentID=(select DepartmentID from inserted))
        begin
        rollback
    end
