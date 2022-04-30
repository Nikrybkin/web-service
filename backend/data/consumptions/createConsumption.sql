INSERT INTO [dbo].[Consumption]
(
    [ViewID],
    [WorkerID],
    [Date],
    [Sum]
)
VALUES (
    @ViewID,
    @WorkerID,
    @Date,
    @Sum
)

SELECT SCOPE_IDENTITY() AS ExpenseID