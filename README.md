# Shortcuts
My custom shortcuts for Vimium C, Excel, and Word.

Path to Personal Macro Workbook and Excel Template (with custom formulas)
- On PC: `C:\Users\<your-username>\AppData\Roaming\Microsoft\Excel\XLSTART\PERSONAL.XLSB`
- On Mac: `/Users/smorris/Library/Group Containers/UBF8T346G9.Office/User Content.localized/Startup.localized/Excel`



## For Joe

Try this: 

```Option Compare Text
Sub AdvancedHighlightDuplicates()
'NOTE: Items must be ordered to use this subroutine.
'Define the number of columns you want colored here - 0 corresponds to only 1 column
Const lngColumnsToColor As Long = 0

If IsNotValidForAdvancedHighlightDuplicates() = True Then
    Exit Sub
End If

Dim rngCell As Range, rngOriginalSelection As Range
Dim lngColorArrayItemCount As Long, lngIndex As Long
lngIndex = 0

Set rngOriginalSelection = selection
rngOriginalSelection.Interior.ColorIndex = xlNone
        
'These are the sufficiently light colors that allow you to view black text
MyColorArray = Array(3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 53, 54, 55)
lngColorArrayItemCount = UBound(MyColorArray) + 1

'The main loop
For Each rngCell In rngOriginalSelection
 
    'If this observation is not repeated, exit the loop with a GoTo
    If Application.WorksheetFunction.CountIf(rngOriginalSelection, rngCell) = 1 Then
        GoTo NextIteration
    End If
 
    'Given that observation IS repeated, apply coloring:
    Range(rngCell, rngCell.Offset(0, lngColumnsToColor)).Interior.ColorIndex = MyColorArray(lngIndex)
    
    'If observation is the last instance of the repeated observations, advance the color index
    If WorksheetFunction.CountIf(Range(rngOriginalSelection.Cells(1, 1).Address, rngCell), rngCell) = WorksheetFunction.CountIf(rngOriginalSelection, rngCell) Then
        lngIndex = lngIndex + 1
    End If
    
    'Restart color index back at 1 if it's reached the end.
    If lngIndex = lngColorArrayItemCount Then lngIndex = 1

NextIteration:
Next rngCell

End Sub


Function IsNotValidForAdvancedHighlightDuplicates() As Boolean
'This is used in AdvancedHighlightDuplicates()
    Dim rng As Range
    Dim i As Long

    ' Check if a range is selected
    If selection Is Nothing Then
        MsgBox "No range is selected. Please select a single column to run the AdvancedHighlightDuplicates macro.", vbExclamation
        IsNotValidForAdvancedHighlightDuplicates = True
        Exit Function
    End If

    Set rng = selection

    ' Check if the selected range is a single column
    If rng.Columns.count > 1 Then
        MsgBox "The selection is more than one column. Please select a single column to run the AdvancedHighlightDuplicates macro.", vbExclamation
        IsNotValidForAdvancedHighlightDuplicates = True
        Exit Function
    End If

    ' Check if the column has at least two cells to compare
    If rng.Cells.count < 2 Then
        MsgBox "The selection column must contain at least two cells to run the AdvancedHighlightDuplicates macro.", vbExclamation
        IsNotValidForAdvancedHighlightDuplicates = True
        Exit Function
    End If

    'Check if the selected range is actually sorted
    If Not IsRangeSorted(rng) Then
        MsgBox "The selection is not sorted. Please sort the range to use the AdvancedHighlightDuplicates macro.", vbExclamation
        IsNotValidForAdvancedHighlightDuplicates = True
        Exit Function
    Else
        IsNotValidForAdvancedHighlightDuplicates = False
    End If

End Function


Function IsRangeSorted(rng As Range) As Boolean
'This is used in IsNotValidForAdvancedHighlightDuplicates
    Dim i As Long
    Dim cellCount As Long
    Dim prevValue As Variant
    Dim currentValue As Variant
    
    IsSortedAscending = True
    IsSortedDescending = True

    cellCount = rng.Cells.count
    prevValue = rng.Cells(1).Value

        For i = 2 To cellCount
            currentValue = rng.Cells(i).Value
            Debug.Print StrComp(CStr(currentValue), CStr(prevValue), vbTextCompare)
            If StrComp(CStr(currentValue), CStr(prevValue), vbTextCompare) < 0 Then ' Use StrComp for case-insensitive comparison
                IsSortedAscending = False
            End If
            
            If StrComp(CStr(currentValue), CStr(prevValue), vbTextCompare) > 0 Then ' Use StrComp for case-insensitive comparison
                IsSortedDescending = False
            End If
            prevValue = currentValue
        Next i

IsRangeSorted = IsSortedAscending Or IsSortedDescending

End Function
```
