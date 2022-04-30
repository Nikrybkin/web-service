SELECT [WorkerID]
        ,[Surname]
        ,[Name]
        ,[Patronymic]
        ,[Position]
        ,[Experience]
        ,[DepartmentID]
FROM [dbo].[Worker]
WHERE [WorkerID]=@WorkerID