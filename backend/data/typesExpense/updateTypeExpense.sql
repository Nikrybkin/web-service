UPDATE [dbo].[TypeExpense]
SET [Name]=@Name,
    [Description]=@Description
WHERE [ViewID]=@ViewID

SELECT [ViewID]
    ,[Name]
    ,[Description]
FROM [dbo].[TypeExpense]
WHERE [ViewID]=@ViewID