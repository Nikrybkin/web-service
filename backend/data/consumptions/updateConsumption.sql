UPDATE [dbo].[Consumption]
SET [ViewID]=@ViewID,
    [WorkerID]=@WorkerID,
    [Date]=@Date,
    [Sum]=@Sum
WHERE [ExpenseID]=@ExpenseID

SELECT [ExpenseID]
        ,[ViewID]
        ,[WorkerID]
        ,[Date]
        ,[Sum]
FROM [dbo].[Consumption]
WHERE [ExpenseID]=@ExpenseID