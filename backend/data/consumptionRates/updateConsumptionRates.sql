UPDATE [dbo].[ConsumptionRates]
SET [DepartmentID]=@DepartmentID
    ,[ViewID]=@ViewID
    ,[Sum]=@Sum
    ,[Date]=@Date
WHERE [NormID]=@NormID

SELECT [NormID]
    ,[DepartmentID]
    ,[ViewID]
    ,[Sum]
    ,[Date]
FROM [dbo].[ConsumptionRates]
WHERE [NormID]=@NormID