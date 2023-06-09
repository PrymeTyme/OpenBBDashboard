# IMPORTATION STANDARD

# IMPORTATION THIRDPARTY
import pytest
from pandas import DataFrame

# IMPORTATION INTERNAL
from openbb_terminal.alternative.oss import github_model


@pytest.fixture(scope="module")
def vcr_config():
    return {
        "filter_headers": [
            ("User-Agent", None),
            ("Authorization", "MOCK_AUTHORIZATION"),
        ],
    }


@pytest.mark.vcr
@pytest.mark.parametrize(
    "repo",
    [("openbb-finance/openbbterminal")],
)
def test_get_repo_summary(repo, recorder):
    df = github_model.get_repo_summary(
        repo=repo,
    )
    recorder.capture(df)


@pytest.mark.vcr
@pytest.mark.parametrize(
    "repo",
    [("openbb-finance/openbbterminal")],
)
def test_get_stars_history(repo, recorder):
    df = github_model.get_stars_history(
        repo=repo,
    )
    recorder.capture(df)


@pytest.mark.vcr
@pytest.mark.parametrize(
    "sortby,top,categories",
    [("stars", 10, "")],
)
def test_get_top_repos(sortby, top, categories, recorder):
    df = github_model.get_top_repos(sortby, top, categories)
    recorder.capture(df)


@pytest.mark.record_http
def test_get_github_data():
    github_model.get_github_data(url="https://api.github.com/")


@pytest.mark.record_http
def test_search_repos():
    df = github_model.search_repos()
    assert isinstance(df, DataFrame)
