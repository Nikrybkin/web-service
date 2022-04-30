SELECT [NormID]
        ,[DepartmentID]
        ,[ViewID]
        ,[Sum]
        ,[Date]
FROM [dbo].[ConsumptionRates]
WHERE [NormID]=@NormID