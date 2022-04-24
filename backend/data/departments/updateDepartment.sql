UPDATE [dbo].[Department]
SET [Name]=@Name,
    [NumberWorkers]=@NumberWorkers
WHERE [DepartmentID]=@DepartmentID

SELECT [DepartmentID]
    ,[Name]
    ,[NumberWorkers]
FROM [dbo].[Department]
WHERE [DepartmentID]=@DepartmentID