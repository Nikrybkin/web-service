INSERT INTO [dbo].[TypeExpense]
(
    [Name],
    [Description]
)
VALUES (
    @Name,
    @Description
)

SELECT SCOPE_IDENTITY() AS ViewID