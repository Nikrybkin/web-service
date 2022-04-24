INSERT INTO [dbo].[Department]
(
    [Name],
    [NumberWorkers]
)
VALUES (
    @Name,
    @NumberWorkers
)

SELECT SCOPE_IDENTITY() AS DepartmentID