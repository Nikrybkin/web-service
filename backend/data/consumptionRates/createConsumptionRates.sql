INSERT INTO [dbo].[ConsumptionRates]
(
    [DepartmentID]
    ,[ViewID]
    ,[Sum]
    ,[Date]
)
VALUES (
    @DepartmentID,
    @ViewID,
    @Sum,
    @Date
)

SELECT SCOPE_IDENTITY() AS NormID