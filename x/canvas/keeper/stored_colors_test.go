package keeper_test

import (
	"strconv"
	"testing"

	keepertest "canvas/testutil/keeper"
	"canvas/testutil/nullify"
	"canvas/x/canvas/keeper"
	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNStoredColors(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.StoredColors {
	items := make([]types.StoredColors, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetStoredColors(ctx, items[i])
	}
	return items
}

func TestStoredColorsGet(t *testing.T) {
	keeper, ctx := keepertest.CanvasKeeper(t)
	items := createNStoredColors(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetStoredColors(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestStoredColorsRemove(t *testing.T) {
	keeper, ctx := keepertest.CanvasKeeper(t)
	items := createNStoredColors(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveStoredColors(ctx,
			item.Index,
		)
		_, found := keeper.GetStoredColors(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestStoredColorsGetAll(t *testing.T) {
	keeper, ctx := keepertest.CanvasKeeper(t)
	items := createNStoredColors(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllStoredColors(ctx)),
	)
}
