UPDATE [dbo].[Worker]
SET [Surname]=@Surname,
    [Name]=@Name,
    [Patronymic]=@Patronymic,
    [Position]=@Position,
    [Experience]=@Experience,
    [DepartmentID]=@DepartmentID
WHERE [WorkerID]=@WorkerID

SELECT [WorkerID]
        ,[Surname]
        ,[Name]
        ,[Patronymic]
        ,[Position]
        ,[Experience]
        ,[DepartmentID]
FROM [dbo].[Worker]
WHERE [WorkerID]=@WorkerID