SELECT [ExpenseID]
        ,[ViewID]
        ,[WorkerID]
        ,[Date]
        ,[Sum]
FROM [dbo].[Consumption]
WHERE [ExpenseID]=@ExpenseID