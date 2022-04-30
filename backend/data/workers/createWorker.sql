INSERT INTO [dbo].[Worker]
(
    [Surname],
    [Name],
    [Patronymic],
    [Position],
    [Experience],
    [DepartmentID]
)
VALUES (
    @Surname,
    @Name,
    @Patronymic,
    @Position,
    @Experience,
    @DepartmentID
)

SELECT SCOPE_IDENTITY() AS WorkerID